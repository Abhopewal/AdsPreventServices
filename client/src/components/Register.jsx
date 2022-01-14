import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { registerAction } from '../features/actions/authAction';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, loading, error } = useSelector((state) => state.authReducer);

    const schema = yup.object().shape({
        name: yup.string().min(4).max(30).required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required(),
        domain: yup.string().url().required()
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
      });

    const onSubmitHandler = (data) => {
      dispatch(registerAction(data));
        reset();
    };

    useEffect(() => {

        if (!user) {
            navigate('/register');
        }
        else if (user) {
            navigate('/dashboard');
        }
    }, [navigate, user])

    return (
        <>
            <section  >
                <div className="container mt-5">
                    <div className="row d-flex align-items-center justify-content-center ">
                        <div className="col-md-6 col-lg-5 col-xl-3">
                            <div>
                                <h6>“ClickCease saves us 15-20% of our Google Ads spend every month”</h6>
                                <hr />
                                <img src="images/qualities.png" id='register_img' alt="img" />
                                <h6>CCPA + GDPR</h6>
                                <p>ClickCease is committed to protecting your data and respecting your privacy</p>
                                <h6>24/7 Support</h6>
                                <p>Dedicated account managers are available for your every need.</p>
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-7 col-xl-7 mt-2 offset-xl-1 ">

                            <div className="divider d-flex align-items-center my-4">
                                <h2 className="text-center fw-bold mx-3 mb-0">  Create your ClickCease account to start your trial</h2>
                            </div>
                            <div className='d-md-flex text-center'>
                                <Link to="#"> <button className='register_btn_service'> <i className="fab fa-google me-2"></i>Continue with Google</button></Link>
                                <Link to="#"> <button className='register_btn_service'> <i className="fab fa-facebook me-2"></i>Continue with Facebook</button></Link>
                            </div>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmitHandler)}>
                                <div className="d-md-flex ">
                                    <div className="form-outline mb-4 reg_field">
                                        <input
                                            {...register("name")}
                                            type="text"
                                            id="form1Example13"
                                            className="form-control form-control-lg"
                                            required
                                        />
                                        <p id='error_msg'>{errors.name?.message}</p>
                                        <label className="form-label" htmlFor="form1Example13">Your Name</label>
                                    </div>
                                    <div className="form-outline mb-4 ml-4 reg_field">
                                        <input
                                            {...register("email")}
                                            type="email"
                                            id="form1Example2"
                                            className="form-control form-control-lg"
                                            required
                                        />
                                        <p id='error_msg'>{errors.email?.message}</p>
                                        <label className="form-label" htmlFor="form1Example2">Your work Email</label>
                                    </div>
                                </div>

                                <div className="d-md-flex ">
                                    <div className="form-outline mb-4 reg_field">
                                        <input
                                            {...register("password")}
                                            type="password"
                                            id="form1Example23"
                                            className="form-control form-control-lg"
                                            required
                                        />
                                        <p id='error_msg'>{errors.password?.message}</p>
                                        <label className="form-label" htmlFor="form1Example23">Password</label>
                                    </div>
                                    <div className="form-outline mb-4 reg_field">
                                        <input
                                            {...register("domain")}
                                            type="text"
                                            id="form1Example23"
                                            className="form-control form-control-lg"
                                            
                                        />
                                        <p id='error_msg'>{errors.domain?.message}</p>
                                        <label className="form-label" htmlFor="form1Example23">Your domain</label>
                                    </div>
                                </div>
                                <p id='error_msg'>{error}</p>
                                <div className="text-center">
                                    <div className="d-flex justify-content-around align-items-center mb-4 reg_field ">
                                    
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="form1Example3"
                                                defaultChecked
                                            />
                                            
                                            <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                                        </div>
                                        <Link to="#!">Forgot password?</Link>
                                    </div>

                                    <button type="submit" className="register_btn">Start your 7-Day free trail</button>
                                </div>
                                <Link to="/login">Have an account? Log in
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register;