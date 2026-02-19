// Test ProtectedRoute authorization
console.log('🧪 ProtectedRoute Test Script');

// Test the role check
const testRoles = ['admin', 'superadmin', 'super_admin'];

testRoles.forEach(role => {
  console.log(`🔑 Testing role: ${role}`);
  
  // This is the exact logic from ProtectedRoute
  const isAuthorized = role === 'admin' || role === 'superadmin' || role === 'super_admin';
  console.log(`✅ Role "${role}" authorized:`, isAuthorized);
});

console.log('🎯 Expected backend role: "super_admin"');
console.log('🌐 If login redirects but dashboard shows loading, check ProtectedRoute console logs');
