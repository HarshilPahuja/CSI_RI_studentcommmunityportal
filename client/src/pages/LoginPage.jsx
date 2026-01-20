import React from 'react';
import LoginHeader from '../components/LoginHeader';
import ClubLogos from '../components/ClubLogos';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="pt-12 pb-8">
          <LoginHeader />
        </div>

        {/* Club Logos  */}
        <div className="flex-1 flex items-center justify-center px-8">
          <ClubLogos />
        </div>
      </div>

      {/* Right Side - Login Panel */}
      <div className="w-1/3 bg-gray-100">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
