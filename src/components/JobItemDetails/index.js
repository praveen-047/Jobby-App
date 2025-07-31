import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import {FaStar, FaSuitcase, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {jobDetails: null, similarJobs: [], apiStatus: 'IN_PROGRESS'}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const formattedJobDetails = this.formatJobDetails(data.job_details)
      const formattedSimilarJobs = data.similar_jobs.map(this.formatSimilarJob)
      console.log(formattedJobDetails)

      this.setState({
        jobDetails: formattedJobDetails,
        similarJobs: formattedSimilarJobs,
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  formatJobDetails = job => ({
    id: job.id,
    title: job.title,
    companyLogoUrl: job.company_logo_url,
    companyWebsiteUrl: job.company_website_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    skills: job.skills,
    lifeAtCompany: job.life_at_company,
  })

  formatSimilarJob = job => ({
    id: job.id,
    title: job.title,
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
  })

  renderLoadingView = () => (
    <div className="failure-view" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={70} width={70} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <div className="job-item-details-container">
        <div className="job-item-details-top-container">
          <div className="job-item-logo-name-rating">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="job-item-company-logo"
            />
            <div className="job-item-name-rating">
              <h1 className="job-item-title">{jobDetails.title}</h1>
              <div className="job-item-rating">
                <FaStar className="job-item-gold-star" />
                <p className="job-item-rating-p">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-location-type-package">
            <div className="job-item-location-type">
              <div className="job-item-location-p">
                <IoLocationSharp className="job-item-loc-typ-icon" />
                <p className="job-item-name">{jobDetails.location}</p>
              </div>
              <div className="job-item-location-p">
                <FaSuitcase className="job-item-loc-typ-icon" />
                <p className="job-item-name">{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="job-item-package">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr />
          <div className="job-item-description">
            <div className="job-item-description-visit">
              <h1 className="job-item-description-heading">Description</h1>
              <a
                href={jobDetails.companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-container"
              >
                <p className="visit-p">Visit</p>
                <FaExternalLinkAlt className="visit-icon" />
              </a>
            </div>
            <div>
              <p className="job-item-description-p">
                {jobDetails.jobDescription}
              </p>
            </div>
          </div>
          <div className="job-item-skills">
            <h4>Skills</h4>
            <ul className="job-item-skill-name">
              {jobDetails.skills.map(skill => (
                <li className="job-item-skill-name-li" key={skill.name}>
                  <img
                    src={skill.image_url}
                    alt={skill.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-item-life-at-company">
            <div>
              <h4>Life at Company</h4>
              <p className="life-at-company-p">
                {jobDetails.lifeAtCompany.description}
              </p>
            </div>
            <img
              src={jobDetails.lifeAtCompany.image_url}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <div className="job-item-details-bottom-container">
          <h4 className="similar-jobs-heading">Similar Jobs</h4>
          <ul className="similar-job-cards">
            {similarJobs.map(job => (
              <li key={job.id} className="similar-job-item">
                <div className="similar-job-header">
                  <img
                    src={job.companyLogoUrl}
                    alt="similar job company logo"
                    className="similar-job-logo"
                  />
                  <div className="similar-job-title-rating">
                    <h3 className="similar-job-title">{job.title}</h3>
                    <div className="similar-job-rating">
                      <FaStar className="similar-job-star" />
                      <p>{job.rating}</p>
                    </div>
                  </div>
                </div>

                <div className="similar-job-description">
                  <h4>Description</h4>
                  <p className="similar-job-description-p">
                    {job.jobDescription}
                  </p>
                </div>

                <div className="similar-job-footer">
                  <div className="similar-job-location">
                    <IoLocationSharp className="job-item-loc-typ-icon" />
                    <p>{job.location}</p>
                  </div>
                  <div className="similar-job-location">
                    <FaSuitcase className="job-item-loc-typ-icon" />
                    <p>{job.employmentType}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderContentView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderJobDetailsView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderContentView()}
      </>
    )
  }
}

export default withRouter(JobItemDetails)
