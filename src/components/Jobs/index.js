import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoSearch} from 'react-icons/io5'
import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class Jobs extends Component {
  state = {
    searchInput: '',
    profileInfo: {},
    apiStatus: 'IN_PROGRESS',
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
    jobsList: [],
    jobsApiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  // PROFILE API
  getProfileData = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const apiurl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiurl, options)
    if (response.ok) {
      const profileData = await response.json()
      // eslint-disable-next-line camelcase
      const {name, profile_image_url, short_bio} = profileData.profile_details
      const formattedData = {
        name,
        profileImg: profile_image_url,
        shortBio: short_bio,
      }
      this.setState({profileInfo: formattedData, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  // JOBS API
  getJobsData = async () => {
    this.setState({jobsApiStatus: 'IN_PROGRESS'})
    const jwtToken = Cookies.get('jwt_token')

    // prettier-ignore
    const {selectedEmploymentTypes, selectedSalaryRange, searchInput} = this.state

    const employmentTypes = selectedEmploymentTypes.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${selectedSalaryRange}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedJobs = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        rating: job.rating,
        location: job.location,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        packagePerAnnum: job.package_per_annum,
        jobDescription: job.job_description,
      }))
      this.setState({jobsList: formattedJobs, jobsApiStatus: 'SUCCESS'})
    } else {
      this.setState({jobsApiStatus: 'FAILURE'})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getJobsData()
  }

  onChangeSalaryRange = event => {
    this.setState({selectedSalaryRange: event.target.value}, this.getJobsData)
  }

  onChangeEmploymentType = event => {
    const {value, checked} = event.target
    this.setState(prevState => {
      const updatedTypes = checked
        ? [...prevState.selectedEmploymentTypes, value]
        : prevState.selectedEmploymentTypes.filter(id => id !== value)

      return {selectedEmploymentTypes: updatedTypes}
    }, this.getJobsData)
  }

  renderProfileContainer = () => {
    const {profileInfo, apiStatus} = this.state

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={40} width={40} />
          </div>
        )
      case 'SUCCESS':
        return (
          <div className="profile-container">
            <img
              src={profileInfo.profileImg}
              alt="profile"
              className="profile-photo"
            />
            <h1 className="profile-name">{profileInfo.name}</h1>
            <p className="profile-bio">{profileInfo.shortBio}</p>
          </div>
        )
      case 'FAILURE':
        return (
          <div className="profile-failure-container">
            <button
              type="button"
              className="retry-button"
              onClick={this.getProfileData}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderEmploymentTypeFilters = () => (
    <div className="employment-type-filter">
      <h3 className="filter-heading">Type of Employment</h3>
      <ul className="checkbox-list">
        {employmentTypesList.map(type => (
          <li key={type.employmentTypeId}>
            <input
              type="checkbox"
              id={type.employmentTypeId}
              value={type.employmentTypeId}
              onChange={this.onChangeEmploymentType}
            />
            <label htmlFor={type.employmentTypeId}>{type.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryRangeFilters = () => (
    <div className="salary-range-filter">
      <h3 className="filter-heading">Salary Range</h3>
      <ul className="radio-list">
        {salaryRangesList.map(range => (
          <li key={range.salaryRangeId}>
            <input
              type="radio"
              id={range.salaryRangeId}
              name="salaryRange"
              value={range.salaryRangeId}
              onChange={this.onChangeSalaryRange}
            />
            <label htmlFor={range.salaryRangeId}>{range.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderJobsList = () => {
    const {jobsList, jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case 'IN_PROGRESS':
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={40} width={40} />
          </div>
        )
      case 'SUCCESS':
        return jobsList.length === 0 ? (
          <div className="no-jobs-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-image"
            />
            <h3 className="no-jobs-heading">No Jobs Found</h3>
            <p>We could not find any jobs. Try other filters.</p>
          </div>
        ) : (
          <ul className="jobs-list">
            {jobsList.map(job => (
              <JobItem key={job.id} jobDetails={job} />
            ))}
          </ul>
        )
      case 'FAILURE':
        return (
          <div className="no-jobs-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="no-jobs-image"
            />
            <h3 className="no-jobs-heading">Oops! Something went wrong</h3>
            <p>We are having trouble fetching jobs.</p>
            <button type="button" onClick={this.getJobsData}>
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          value={searchInput}
          onChange={this.onChangeSearch}
          placeholder="Search"
        />
        <button
          type="button"
          className="search-icon-button"
          onClick={this.onClickSearchIcon}
          data-testid="searchButton"
        >
          <IoSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="top-jobs-container">
            <div className="top-search-container">
              {this.renderSearchContainer()}
            </div>
            {this.renderProfileContainer()}
            <hr className="hr" />
            {this.renderEmploymentTypeFilters()}
            <hr className="hr" />
            {this.renderSalaryRangeFilters()}
          </div>
          <div className="bottom-jobs-container">
            <div className="bottom-search-container">
              {this.renderSearchContainer()}
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
