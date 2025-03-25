import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Aqui va la llama a la API
		console.log('Email:', email, 'Password:', password);
		toast.info('Inicio de sesión');
	};

	return (
		<div className="content-wrapper">
			<ToastContainer />
			<div className="login-box mx-auto py-4">
				<div className="card">
					<div className="card-body login-card-body">
						<p className="login-box-msg">Iniciar sesión</p>

						<form onSubmit={handleSubmit}>
							<div className="input-group mb-3">
								<input
									type="email"
									className="form-control"
									placeholder="Correo electrónico"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-envelope" />
									</div>
								</div>
							</div>

							<div className="input-group mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Contraseña"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-lock" />
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-12">
									<button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
								</div>
							</div>
						</form>

						<p className="mb-1">
							<a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
