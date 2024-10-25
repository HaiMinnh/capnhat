'use client'; // Đánh dấu đây là Client Component

import React, { useState } from 'react'; // Thêm useState vào import
import { Button, Modal } from 'react-bootstrap'; // Import Modal từ react-bootstrap
import Head from 'next/head';
import Image from 'next/image'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEnvelope, faLock, faEye, faEyeSlash, faPhone, faCalendar, faTransgender } from '@fortawesome/free-solid-svg-icons'; 
import styles from '../../scss/register.module.scss';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // Để lưu trữ thông báo lỗi
  const [showErrorModal, setShowErrorModal] = useState(false); // Trạng thái modal thông báo lỗi

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy cho email
    const phoneRegex = /^[0-9]{10,15}$/; // Biểu thức chính quy cho số điện thoại

    if (!emailRegex.test(email)) {
      newErrors.email = 'Email không hợp lệ.';
    }

    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Số điện thoại phải từ 10 đến 15 chữ số.';
    }

    if (!dob) {
      newErrors.dob = 'Vui lòng chọn ngày sinh.';
    }

    if (!gender) {
      newErrors.gender = 'Vui lòng chọn giới tính.';
    }

    if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationSuccess = validateForm();
  
    if (validationSuccess) {
      setIsSubmitting(true);
  
      const userData = {
        id: 0,
        name,
        email,
        password,
        phone,
        birthday: dob,
        gender: gender === 'male', 
        role: 'user',
        skill: [],
        certification: [],
      };
  
      try {
        const cybersoftToken = localStorage.getItem('cybersoft_token'); // Hoặc lấy từ nơi lưu trữ của bạn
        const accessToken = localStorage.getItem('access_token'); // Hoặc lấy từ nơi lưu trữ của bạn
  
        // Kiểm tra xem có token không
        if (!cybersoftToken || !accessToken) {
          throw new Error('Vui lòng đảm bảo bạn đã đăng nhập để lấy token.');
        }
  
        const response = await fetch('https://fiverrnew.cybersoft.edu.vn/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Token cho tài khoản đăng nhập
            'Cybersoft-Token': cybersoftToken, // Token từ hệ thống học tập
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.message || 'Đăng ký không thành công, vui lòng kiểm tra lại thông tin.';
          throw new Error(errorMessage);
        }
  
        const data = await response.json();
        console.log('Đăng ký thành công:', data);
        router.push('/profile');
  
        // Reset các trường input
        setName('');
        setEmail('');
        setPhone('');
        setDob('');
        setGender('');
        setPassword('');
        setErrors({});
      } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        setModalShow(true);
        setErrors({ api: error.message });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setModalShow(true);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <h2>Create Your Account</h2>
            <p>Please fill in your details to register</p>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />
                  Your Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">
                  <FontAwesomeIcon icon={faPhone} className={styles.inputIcon} />
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="Enter your phone number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="dob">
                  <FontAwesomeIcon icon={faCalendar} className={styles.inputIcon} />
                  Date of Birth
                </label>
                <input 
                  type="date" 
                  id="dob" 
                  name="dob" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required 
                />
                {errors.dob && <span className={styles.error}>{errors.dob}</span>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="gender">
                  <FontAwesomeIcon icon={faTransgender} className={styles.inputIcon} />
                  Gender
                </label>
                <select 
                  id="gender" 
                  name="gender" 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className={styles.error}>{errors.gender}</span>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">
                  <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility} 
                    className={styles.eyeButton}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.password && <span className={styles.error}>{errors.password}</span>}
              </div>
              <div className={styles.rememberMe}>
                <label>
                  <input type="checkbox" name="remember" /> Remember me
                </label>
              </div>
              <Button type="submit" className={styles.btn}>
                Register
              </Button>
              <p className={styles.signupLink}>
                Already have an account? <a href="/login">Login</a>
              </p>
            </form>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/register.jpg"
              width={500} 
              height={500} 
              alt="Registration"
              className={styles.playImage}
            />
          </div>
        </div>

        {/* Modal hiển thị thông báo lỗi */}
        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Thông báo lỗi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Register;
