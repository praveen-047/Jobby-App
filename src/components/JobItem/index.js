// JobItem.js
import {Link} from 'react-router-dom'
import {FaStar, FaSuitcase} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    rating,
  } = jobDetails

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="company-logo-and-rating">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="logo-rating">
            <h1 className="company-name">{title}</h1>
            <div className="rating-container">
              <FaStar id="gold-star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-and-package">
          <div>
            <div className="location-type">
              <IoLocationSharp className="location" />
              <p className="">{location}</p>
            </div>
            <div className="location-type">
              <FaSuitcase className="suitcase" />
              <p>{employmentType}</p>
            </div>
          </div>
          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="hr" />
        <div className="disc-container">
          <h1 className="desc-heading">Description</h1>
          <p className="desc-para">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
