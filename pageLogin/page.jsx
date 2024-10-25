'use client'; // Đánh dấu đây là Client Component

import React, { useState } from 'react'; // Thêm useState vào import
import { Button, Modal } from 'react-bootstrap';
import Head from 'next/head';
import Image from 'next/image'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import styles from '../../scss/login.module.scss';
import { useRouter } from 'next/navigation'; // Import useRouter

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const [email, setEmail] = useState(''); // State cho email
  const [password, setPassword] = useState(''); // State cho password
  const [errors, setErrors] = useState({}); // State cho lỗi
  const [modalShow, setModalShow] = useState(false); // State cho modal lỗi
  const router = useRouter(); // Sử dụng useRouter từ next/navigation

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email không được để trống.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const userData = {
        email,
        password,
    };

    try {
        const response = await fetch('https://fiverrnew.cybersoft.edu.vn/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cybersoft-Token': process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN, // Thêm Cybersoft token từ biến môi trường
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Đăng nhập không thành công, vui lòng kiểm tra lại thông tin.';
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Đăng nhập thành công:', data);

        // Lưu access token vào localStorage
        localStorage.setItem('access_token', data.token);

        // Chuyển hướng đến trang profile
        router.push('/profile');

        // Reset các trường input
        setEmail('');
        setPassword('');
        setErrors({});
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        setModalShow(true); // Hiện modal khi có lỗi
        setErrors({ api: error.message });
    }
};

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <h1>Sign In to Fiverr</h1>
            <p>Please login to your account</p>
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
                Login
              </Button>
              <p className={styles.signupLink}>
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </form>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/login.jpg"
              width={500} 
              height={500} 
              alt="Partner"
              className={styles.playImage}
            />
          </div>
        </div>
      </div>

      {/* Modal để hiển thị lỗi */}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errors.api}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
