"use client"; // Đánh dấu component này là Client Component

import React, { useState } from 'react';
import styles from '../../scss/detail.scss';

const Rating = ({ handleStarClick, initialRating }) => {
  const [rating, setRating] = useState(initialRating); // Lưu rating hiện tại

  const handleClick = (index) => {
    setRating(index); // Cập nhật rating khi sao được chọn
    handleStarClick(index); // Gọi hàm handleStarClick nếu cần
  };

  return (
    <div className={`seller-star-rating d-flex align-items-center ${styles.ratingContainer}`}>
      <ul className={`ant-rate ant-rate-disabled ${styles.starList}`} tabIndex="-1" role="radiogroup">
        {Array.from({ length: 5 }, (_, index) => (
          <li
            key={index}
            className={`ant-rate-star ${index < rating ? styles.activeStar : ''}`}
            onClick={() => handleClick(index + 1)} // Tăng sao từ 1 đến 5
          >
            {index < rating ? '★' : '☆'} {/* Hiển thị sao đã chọn */}
          </li>
        ))}
      </ul>
      <div className={styles.starScore}>{rating > 0 ? rating : "0"}</div> {/* Hiển thị 0 nếu chưa có đánh giá */}
      <div className={styles.rating}>
        (<span>145</span>) {/* Số lượng đánh giá */}
      </div>
    </div>
  );
};


//FAQ
const FaqItem = ({ index, isOpen, toggleFaq }) => (
  <li key={index}>
    <div className="faq-header" onClick={() => toggleFaq(index)}>
      <h3>There are many passages but the majority?</h3>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className={`arrow ${isOpen ? 'open' : ''}`} // Thêm lớp 'open' khi xổ xuống
      >
        <path d="M4 6l4 4 4-4H4z"></path>
      </svg>
    </div>
    {isOpen && (
      <p>
        "Voluptates amet earum velit nobis aliquam laboriosam nihil debitis facere voluptatibus consectetur quae quasi fuga, ad corrupti libero omnis sapiente non assumenda, incidunt officiis eaque iste minima autem."
      </p>
    )}
  </li>
);


const SellerProfile = () => (
  <div className="profile d-flex gap-3">
    <div className="profile-img" style={{ width: '110px', height: '110px' }}>
      <img className="w-100 rounded-circle" src="http://sc04.alicdn.com/kf/Hc3e6159_n.jpg" alt="Seller" />
    </div>
    <div className="profile-label">
      <h3 className="seller-name">admin</h3>
      <p>Articles & Blog Posts</p>
      <div className="seller-star-rating d-flex align-items-center">
        <ul className="ant-rate ant-rate-disabled" tabIndex="-1" role="radiogroup" style={{ color: 'rgb(255, 179, 62)' }}>
          <li className="ant-rate-star ant-rate-star-full">★</li>
          <li className="ant-rate-star ant-rate-star-full">★</li>
          <li className="ant-rate-star ant-rate-star-full">★</li>
          <li className="ant-rate-star ant-rate-star-zero">☆</li>
          <li className="ant-rate-star ant-rate-star-zero">☆</li>
        </ul>
        <div className="star-score">3</div>
        <div className="rating">(145)</div>
      </div>
      <button className="contact">Contact Me</button>
    </div>
  </div>
);

const Detail = () => {
  const [faqOpen, setFaqOpen] = useState([false, false, false, false]);
  const [rating, setRating] = useState(0);

  const handleStarClick = (newRating) => {
    setRating(newRating); // Cập nhật rating mỗi lần người dùng nhấp vào sao
  };
  const toggleFaq = (index) => {
    setFaqOpen(prev => {
      const newFaqOpen = [...prev];
      newFaqOpen[index] = !newFaqOpen[index];
      return newFaqOpen;
    });
  };

  return (
    <section className="job-detail">
      <div className="container d-flex justify-content-between">
        <div className="col-7 position-relative">
          <div className="job-detail-info">
            <h1 className="job-title">I will design unique minimaliast modern and creative logo design</h1>
            <div className="seller-overview d-flex flex-wrap gap-3 align-items-center">
              <div className="seller-avatar">
                <img className="rounded-circle" width="30" src="/register.png" alt="avatar" />
              </div>
              <div className="seller-name">Admin</div>
              <div className="seller-level">Level 2 seller</div> /
              <Rating rating={rating} handleStarClick={handleStarClick} />/
              <div className="seller-ordered">2 Order in Queue</div>
            </div>
          </div>
          <div className="job-img mt-3">
            <img className="img-fluid w-100" src="https://fiverrnew.cybersoft.edu.vn/images/cv1.jpg" alt="Job Image" />
          </div>
          <div className="job-description mt-5">
            <h2>About This Gig</h2>
            <p className="description">
              Welcome to my custom, modern, creative and unique logo design service. I appreciate your valuable time to monitor my gig.
              Are you looking for a custom or professional logo for your business to give it a new look? Yes, this is the right place.
              Why choose me: Professional, Creative and unique logo design. Eye-Catching and Customer Attractive. High Quality & Perfect Design. Clean & Smooth & minimalist Work.
            </p>
          </div>

          <div className="about-seller mt-5">
            <h2>About The Seller</h2>
            <SellerProfile />
          </div>

          <div className="FAQ mt-5">
            <h2>FAQ</h2>
            <ul>
              {faqOpen.map((isOpen, index) => (
                <FaqItem key={index} index={index} isOpen={isOpen} toggleFaq={toggleFaq} />
              ))}
            </ul>
          </div>

          <div className="rating-section">
            <div className="review-count d-flex justify-content-between">
              <div className="count d-flex align-items-center">
                <h2 className="mb-0 me-2">145 Reviews</h2>
                <div className="star d-flex align-items-center">
                  <ul className="ant-rate ant-rate-disabled" tabIndex="-1" role="radiogroup" style={{ color: 'rgb(255, 179, 62)' }}>
                    <li className="ant-rate-star ant-rate-star-full"></li>
                    <li className="ant-rate-star ant-rate-star-full"></li>
                    <li className="ant-rate-star ant-rate-star-full"></li>
                    <li className="ant-rate-star ant-rate-star-zero"></li>
                    <li className="ant-rate-star ant-rate-star-zero"></li>
                  </ul>
                  <p className="star-score">3</p>
                </div>
              </div>
              <div className="sort d-flex align-items-center">
                <span className="pre-title">Sort By</span>
                <select>
                  <option value="recent">Most Recent</option>
                  <option value="relevant">Most Relevant</option>
                </select>
              </div>
            </div>

            <div className="review-rating mt-3 row">
              <div className="col-md-6 col-sm-12">
                <div className="stars-counters">
                  <table>
                    <tbody>
                      {[5, 4, 3, 2, 1].map((stars, index) => (
                        <tr key={index}>
                          <td className="star-title-container">
                            <button>{stars} Stars</button>
                          </td>
                          <td className="star-score-container">
                            <div className="star-score">{stars} Reviews</div>
                            <div className="progress">
                              <div className="progress-bar" role="progressbar" style={{ width: `${stars * 20}%` }} aria-valuenow={stars * 20} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <h3 className="review-title">What people say</h3>
                <div className="review-content">
                  {/* Nội dung review */}
                </div>
              </div>
            </div>

            <div class="review-filter mt-5">
              <h3>Filters</h3>
              <form class="search-form d-flex" onsubmit="return false;">
                <input type="text" placeholder="Search reviews" aria-label="Search reviews" />
                <button type="submit">
                  <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7c1.455 0 2.794-.434 3.895-1.157l3.843 3.843 1.415-1.415-3.843-3.843C13.566 9.794 14 8.455 14 7c0-3.866-3.134-7-7-7zm0 2c2.759 0 5 2.241 5 5s-2.241 5-5 5-5-2.241-5-5 2.241-5 5-5z" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>

            <div class="review-comment">
              <ul class="review-comment-list">
                <li className="row py-4">
                  <div className="reviewer-avatar col-2">
                    <img src="http://sc04.alicdn.com/kf/Hc3e6159_n.jpg" alt="Reviewer Avatar" className="rounded-circle w-100" />
                  </div>
                  <div className="reviewer-comment col-10">
                    <div className="reviewer-name d-flex align-items-center">
                      <h3>idarethejeff</h3>
                      <span className="star">
                        <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="8 12 3.09 15 4.18 9.76 0 6 5.91 6 8 0 10.09 6 16 6 11.82 9.76 12.91 15" fill="#FFD700" />                        </svg>
                      </span>
                      <span className="star-score">2</span>
                    </div>
                    <div className="reviewer-country d-flex align-items-center">
                      <img width="20" height="20" src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ed.png" alt="Switzerland Flag" className="country-flag" />
                      <div className="ms-2 country-name">Switzerland</div>
                    </div>
                    <div className="comment">
                      <p>
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus qui voluptatem nemo! Sit aliquam optio incidunt temporibus, eligendi porro ducimus nulla modi, ut deserunt repudiandae."
                      </p>
                    </div>
                    <div className="reviewer-helpful d-flex align-items-center gap-2">
                      <div className="helpful-title">Helpful?</div>
                      <div className="helpful-thumb d-flex align-items-center gap-2">
                        <div className="yes d-flex align-items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.89 14.75H1C0.59 14.75 0.25 14.41 0.25 14V8C0.25 7.59 0.59 7.25 1 7.25H3.46L6.05 0.72C6.16 0.43 6.44 0.25 6.75 0.25H7.67C8.59 0.25 9.34 0.98 9.34 1.87V5.45H13.17C14 5.45 14.78 5.84 15.27 6.48C15.73 7.1 15.87 7.87 15.66 8.6L14.39 12.93C14.08 13.99 13.06 14.74 11.9 14.74L11.89 14.75ZM4.75 13.25H11.89C12.38 13.25 12.81 12.95 12.94 12.52L14.21 8.19C14.32 7.81 14.16 7.52 14.06 7.39C13.85 7.12 13.53 6.96 13.16 6.96H8.58C8.17 6.96 7.83 6.62 7.83 6.21V1.87C7.83 1.81 7.76 1.75 7.66 1.75H7.25L4.74 8.08V13.25H4.75ZM1.75 13.25H3.25V8.75H1.75V13.25V13.25Z"></path>                          </svg>
                          <span>Yes</span>
                        </div>
                        <div className="no d-flex align-items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.25533 14.75H8.33533C7.41533 14.75 6.66533 14.03 6.66533 13.13L6.66533 9.55H2.83533C2.00533 9.55 1.22533 9.16 0.735326 8.52C0.275326 7.9 0.135326 7.13 0.345326 6.4L1.62533 2.06C1.93533 1 2.95533 0.25 4.11533 0.25L15.0053 0.25C15.4153 0.25 15.7553 0.59 15.7553 1V7C15.7553 7.41 15.4153 7.75 15.0053 7.75H12.5453L9.95533 14.28C9.84533 14.57 9.56533 14.75 9.25533 14.75ZM4.11533 1.75C3.62533 1.75 3.19533 2.05 3.06533 2.48L1.79533 6.81C1.68533 7.19 1.84533 7.48 1.94533 7.61C2.15533 7.88 2.47533 8.04 2.84533 8.04H7.42533C7.83533 8.04 8.17533 8.38 8.17533 8.79L8.17533 13.12C8.17533 13.17 8.24533 13.24 8.34533 13.24H8.75533L11.2653 6.91V1.75L4.11533 1.75ZM12.7553 6.25H14.2553V1.75L12.7553 1.75V6.25Z"></path>                          </svg>
                          <span>No</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="row py-4">
                  <div className="reviewer-avatar col-2">
                    <img src="http://sc04.alicdn.com/kf/Hc3e6159_n.jpg" alt="Reviewer Avatar" className="rounded-circle w-100" />
                  </div>
                  <div className="reviewer-comment col-10">
                    <div className="reviewer-name d-flex align-items-center">
                      <h3>idarethejeff</h3>
                      <span className="star">
                        <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="8 12 3.09 15 4.18 9.76 0 6 5.91 6 8 0 10.09 6 16 6 11.82 9.76 12.91 15" fill="#FFD700" />                        </svg>
                      </span>
                      <span className="star-score">2</span>
                    </div>
                    <div className="reviewer-country d-flex align-items-center">
                      <img width="20" height="20" src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ed.png" alt="Switzerland Flag" className="country-flag" />
                      <div className="ms-2 country-name">Switzerland</div>
                    </div>
                    <div className="comment">
                      <p>
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus qui voluptatem nemo! Sit aliquam optio incidunt temporibus, eligendi porro ducimus nulla modi, ut deserunt repudiandae."
                      </p>
                    </div>
                    <div className="reviewer-helpful d-flex align-items-center gap-2">
                      <div className="helpful-title">Helpful?</div>
                      <div className="helpful-thumb d-flex align-items-center gap-2">
                        <div className="yes d-flex align-items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.89 14.75H1C0.59 14.75 0.25 14.41 0.25 14V8C0.25 7.59 0.59 7.25 1 7.25H3.46L6.05 0.72C6.16 0.43 6.44 0.25 6.75 0.25H7.67C8.59 0.25 9.34 0.98 9.34 1.87V5.45H13.17C14 5.45 14.78 5.84 15.27 6.48C15.73 7.1 15.87 7.87 15.66 8.6L14.39 12.93C14.08 13.99 13.06 14.74 11.9 14.74L11.89 14.75ZM4.75 13.25H11.89C12.38 13.25 12.81 12.95 12.94 12.52L14.21 8.19C14.32 7.81 14.16 7.52 14.06 7.39C13.85 7.12 13.53 6.96 13.16 6.96H8.58C8.17 6.96 7.83 6.62 7.83 6.21V1.87C7.83 1.81 7.76 1.75 7.66 1.75H7.25L4.74 8.08V13.25H4.75ZM1.75 13.25H3.25V8.75H1.75V13.25V13.25Z"></path>                          </svg>
                          <span>Yes</span>
                        </div>
                        <div className="no d-flex align-items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.25533 14.75H8.33533C7.41533 14.75 6.66533 14.03 6.66533 13.13L6.66533 9.55H2.83533C2.00533 9.55 1.22533 9.16 0.735326 8.52C0.275326 7.9 0.135326 7.13 0.345326 6.4L1.62533 2.06C1.93533 1 2.95533 0.25 4.11533 0.25L15.0053 0.25C15.4153 0.25 15.7553 0.59 15.7553 1V7C15.7553 7.41 15.4153 7.75 15.0053 7.75H12.5453L9.95533 14.28C9.84533 14.57 9.56533 14.75 9.25533 14.75ZM4.11533 1.75C3.62533 1.75 3.19533 2.05 3.06533 2.48L1.79533 6.81C1.68533 7.19 1.84533 7.48 1.94533 7.61C2.15533 7.88 2.47533 8.04 2.84533 8.04H7.42533C7.83533 8.04 8.17533 8.38 8.17533 8.79L8.17533 13.12C8.17533 13.17 8.24533 13.24 8.34533 13.24H8.75533L11.2653 6.91V1.75L4.11533 1.75ZM12.7553 6.25H14.2553V1.75L12.7553 1.75V6.25Z"></path>                          </svg>
                          <span>No</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

              </ul>
            </div>

            <div className="add-comment py-4">
              <div className="comment-rating mb-4 d-flex align-items-center justify-content-between">
                <h2 className="m-0">Leave some comments</h2>
                <div className="d-flex align-items-center gap-1">
                  <ul className="ant-rate mb-1" tabIndex="0" role="radiogroup" style={{ color: 'rgb(255, 17, 9, 62)' }}>
                    <li>
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12.8l-4.8 2.5 1.2-5.1-4.1-3.5 5.4-.5L8 0l2 5.2 5.4.5-4.1 3.5 1.2 5.1L8 12.8z" />
                      </svg>
                    </li>
                    <li>
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12.8l-4.8 2.5 1.2-5.1-4.1-3.5 5.4-.5L8 0l2 5.2 5.4.5-4.1 3.5 1.2 5.1L8 12.8z" />
                      </svg>
                    </li>
                    <li>
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12.8l-4.8 2.5 1.2-5.1-4.1-3.5 5.4-.5L8 0l2 5.2 5.4.5-4.1 3.5 1.2 5.1L8 12.8z" />
                      </svg>
                    </li>
                    <li>
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12.8l-4.8 2.5 1.2-5.1-4.1-3.5 5.4-.5L8 0l2 5.2 5.4.5-4.1 3.5 1.2 5.1L8 12.8z" />
                      </svg>
                    </li>
                    <li>
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12.8l-4.8 2.5 1.2-5.1-4.1-3.5 5.4-.5L8 0l2 5.2 5.4.5-4.1 3.5 1.2 5.1L8 12.8z" />
                      </svg>
                    </li>
                  </ul>
                  <h2 className="m-0">Rating</h2>
                </div>
              </div>
              <form>
                <textarea required name="noiDung" id="comment" cols="100" rows="5" placeholder="Write your comment here..."></textarea>
                <button type="submit" className="comment-submit">Comment</button>
              </form>
            </div>


          </div>

        </div>

        <div className="col-4">
          <div className="check-out">
            <div className="check-out-header">
              <div className="check-out-header-inner">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#basic" role="tab">
                      Basic
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#standard" role="tab">
                      Standard
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#premium" role="tab">
                      Premium
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="check-out-body">
              <form action="">
                <div className="tab-content">
                  <div className="tab-pane active" id="basic" role="tabpanel">
                    <div>
                      <div className="price d-flex align-items-center justify-content-between">
                        <span className="title">Basic</span>
                        <span className="title">US$ 5</span>
                      </div>
                      <p className="description">
                        1000 Words US$5 2x500 words or 1x1000 Words articles 1 Day Delivery Up to 1,000 words SEO keywords
                      </p>
                      <div className="additional-info d-flex gap-4 mb-3">
                        <div className="delivery d-flex align-items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM8 4v4l3 1.5-.5 1-4-2V4h1z" />
                          </svg>
                          <span>14 Days Delivery</span>
                        </div>
                        <div className="revision d-flex align-items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-1.582 1.582L12.854 1.854 12.146.146zM11.207 3.5 4.5 10.207V12h1.793l6.707-6.707-1.793-1.793z" />
                          </svg>
                          <span>Unlimited Revisions</span>
                        </div>
                      </div>
                      <ul className="feature m-0 p-0">
                        <li className="d-flex align-items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="#1dbf73">
                            <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                          </svg>
                          <span>Good feature</span>
                        </li>
                        <li className="d-flex align-items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="#1dbf73">
                            <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                          </svg>
                          <span>Good feature</span>
                        </li>
                        <li className="d-flex align-items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="#1dbf73">
                            <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                          </svg>
                          <span>Good feature</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="tab-pane" id="standard" role="tabpanel">
                    {/* Nội dung cho gói Standard */}
                  </div>
                  <div className="tab-pane" id="premium" role="tabpanel">
                    {/* Nội dung cho gói Premium */}
                  </div>
                </div>
              </form>
            </div>
            <div className="check-out-footer">
              <button type="button" className="submit">
                Continue (US$ 5)
              </button>
              <a href="#compare" className="compare">Compare Packages</a>
            </div>
          </div>
        </div>
      </div >
    </section >
  );
};

export default Detail;
