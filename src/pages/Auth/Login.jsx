import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { CiMail, CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
      <>
        <Navbar />
        <main className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center py-12 bg-gray-50 dark:bg-slate-900 transition-colors">
            <div className="w-[85%] max-w-6xl mx-auto flex bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden min-h-[600px]">
                {/* Left Side - Image */}
                <div className="hidden md:block w-1/2 relative bg-indigo-600">
                    <img 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" 
                        alt="Login Visual" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-transparent flex flex-col justify-end p-12 text-white">
                        <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
                        <p className="text-indigo-100 text-lg">Access your dashboard and manage your projects efficiently.</p>
                    </div>
                </div>
            
                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Please login to continue to your account</p>
                        </div>
            
                        <div className="space-y-4">
                            <button type="button" className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors h-12 rounded-xl text-gray-700 dark:text-gray-200 font-medium">
                                <FcGoogle className="text-xl" />
                                <span>Sign in with Google</span>
                            </button>

                            <div className="relative flex items-center gap-4 my-6">
                                <div className="h-px bg-gray-200 flex-1"></div>
                                <span className="text-sm text-gray-400 font-medium uppercase">Or</span>
                                <div className="h-px bg-gray-200 flex-1"></div>
                            </div>
                
                            <form className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <CiMail className="text-gray-400 text-xl group-focus-within:text-indigo-600 transition-colors" />
                                        </div>
                                        <input 
                                            type="email" 
                                            placeholder="name@example.com" 
                                            className="w-full pl-11 pr-4 h-12 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/10 dark:focus:ring-indigo-400/10 outline-none transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" 
                                            required 
                                        />                 
                                    </div>
                                </div>
                    
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <CiLock className="text-gray-400 text-xl group-focus-within:text-indigo-600 transition-colors" />
                                        </div>
                                        <input 
                                            type="password" 
                                            placeholder="Enter your password" 
                                            className="w-full pl-11 pr-4 h-12 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-600/10 dark:focus:ring-indigo-400/10 outline-none transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" 
                                            required 
                                        />
                                    </div>
                                </div>
                    
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            id="remember" 
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                                        />
                                        <label htmlFor="remember" className="text-gray-600 dark:text-gray-400 cursor-pointer select-none">Remember me</label>
                                    </div>
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">Forgot password?</a>
                                </div>
                    
                                <button 
                                    type="submit" 
                                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-indigo-600/20"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
            
                        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                            Don’t have an account? <Link to="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">Create account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
      </>
    );
};

export default Login;
