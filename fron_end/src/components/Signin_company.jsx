import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building, 
  KeyRound, 
  Shield, 
  Loader2, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Briefcase,
  Lock
} from "lucide-react";
import axios from "axios";

const EnterpriseSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    // Validation de base
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
  
    if (!email.includes("@")) {
      setError("Veuillez entrer une adresse email professionnelle valide");
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/Compagny/Signin/", {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/Compagny/dashboard");
      }
  
    } catch (err) {
      console.error("Erreur de connexion:", err);
      if (err.response) {
        setError(err.response.data.detail || "Erreur lors de la connexion");
      } else if (err.request) {
        setError("Impossible de contacter le serveur");
      } else {
        setError("Une erreur est survenue");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative font-[sans-serif] bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 p-6">
      {/* Fond animé subtil pour ambiance professionnelle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -left-48 -top-48 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -right-48 -bottom-48 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute w-64 h-64 left-1/4 top-1/4 bg-gray-200/20 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-8 bg-white/90 backdrop-blur-xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-gray-100">
        {/* Section information entreprise */}
        <div className="relative overflow-hidden p-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] animate-pulse"></div>
          
          <div className="relative max-w-md space-y-12 mx-auto">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-blue-200" />
                <h4 className="text-white text-xl font-semibold">Espace Entreprise</h4>
              </div>
              <p className="text-blue-100 mt-3">
                Accédez à votre espace professionnel sécurisé pour gérer vos ressources
              </p>
            </div>

            <div className="relative p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all duration-300 hover:shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl group-hover:opacity-75 transition-opacity"></div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-200" />
                <h4 className="text-white text-xl font-semibold">Sécurité Renforcée</h4>
              </div>
              <p className="text-blue-100">
                Vos données professionnelles sont protégées par nos systèmes de sécurité avancés
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "24/7", label: "Support dédié" },
                { value: "99.9%", label: "Disponibilité" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 
                           transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section formulaire entreprise */}
        <form onSubmit={handleSubmit} className="p-8 w-full">
          <div className="mb-12 relative group">
            <h3 className="text-3xl font-bold text-center text-gray-800 group-hover:scale-105 transition-transform duration-300">
              Connexion Entreprise
            </h3>
            <p className="mt-2 text-gray-600 text-center">Accédez à votre espace professionnel</p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 text-sm rounded-lg mb-6">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <div className="group">
              <label className="text-gray-700 text-sm mb-2 block font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Email Professionnel
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                           text-gray-800 text-sm transition-all duration-300
                           focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                           group-hover:shadow-md"
                  placeholder="prenom.nom@entreprise.com"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-gray-700 text-sm mb-2 block font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                           text-gray-800 text-sm transition-all duration-300
                           focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                           group-hover:shadow-md pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200"
              />
              <label htmlFor="remember" className="ml-3 block text-sm text-gray-700">
                Rester connecté
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              Mot de passe oublié ?
            </a>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 text-white font-medium rounded-lg
                     bg-blue-600 hover:bg-blue-700
                     transform hover:scale-[1.02] transition-all duration-300
                     shadow-md hover:shadow-lg
                     focus:ring-2 focus:ring-blue-300 focus:outline-none
                     disabled:opacity-70 disabled:cursor-not-allowed
                     relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <KeyRound className="w-5 h-5" />
                    Accéder à votre espace
                  </>
                )}
              </span>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Nouvelle entreprise ?{" "}
            <a href="/enterprise-signup" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
              Demander un accès
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterpriseSignin;