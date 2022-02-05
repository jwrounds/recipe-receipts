import React from 'react';
import { UserFormData } from '../../models/UserFormData';

type LoginFormProps = {
  user: UserFormData
  onUserFormChange: (user: UserFormData) => void;
  onLogin: () => void;
}

const LoginForm = ( { user, onUserFormChange, onLogin }: LoginFormProps ): JSX.Element => {

  const onFormChange = (e: any) => {
    const newUser: UserFormData = Object.assign({}, user);
    const field: string = e.target.id;
    const value: string = e.target.value;
    newUser[field] = value;
    onUserFormChange(newUser);
  }

  return (

    <section className="vh-100" >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
              <div className="card-body p-5 ">

                <h3 className="mb-5 text-center">Sign in</h3>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="username">Username</label>
                  <input type="text" id="username" className="form-control form-control-lg" value={user.username} onChange={onFormChange}/>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input type="password" id="password" className="form-control form-control-lg" value={user.password} onChange={onFormChange}/> 
                </div>

                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={onLogin}>Login</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default LoginForm