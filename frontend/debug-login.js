// Debug login flow in browser console
console.log('🧪 Login Debug Script Loaded');

// Override the login function to add debugging
const originalLogin = window.authApi?.login;

if (originalLogin) {
  window.authApi.login = async (credentials) => {
    console.log('🔐 Login attempt started:', credentials);
    
    try {
      const response = await originalLogin(credentials);
      console.log('📋 Login response:', response);
      console.log('📋 Response data:', response.data);
      console.log('📋 Has token:', !!response.data?.token);
      console.log('📋 Token value:', response.data?.token?.substring(0, 50) + '...');
      
      if (response.data && response.data.token) {
        console.log('✅ Setting cookie...');
        console.log('📋 Cookie before:', document.cookie);
        
        // Set cookie manually to debug
        document.cookie = `token=${response.data.token}; path=/; max-age=86400`;
        
        console.log('📋 Cookie after:', document.cookie);
        console.log('🧭 Attempting redirect...');
        
        // Try redirect
        window.location.href = '/admin/dashboard';
        
      } else {
        console.log('❌ No token in response');
      }
      
      return response;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };
}

console.log('🔧 Login debugging enabled');
