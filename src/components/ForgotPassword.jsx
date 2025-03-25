import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const RecuperarContrasena = () => {
	const [email, setEmail] = useState('');
	const [otp, setOtp] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Aqui va la llama a la API
		console.log('Email:', email);
		toast.info('Recuperar contraseña');
	};

	return (
		<div className="content-wrapper">
			<ToastContainer />
			<div className="login-box mx-auto py-4">
				<div className="card">
					<div className="card-body login-card-body">
						<p className="login-box-msg">Recuperar contraseña</p>

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
									type="text"
									className="form-control"
									placeholder="Código OTP"
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-key" />
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-12">
									<button type="submit" className="btn btn-primary btn-block">Verificar OTP</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecuperarContrasena;
