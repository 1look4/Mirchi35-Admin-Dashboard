# API Integration Guide

## Environment Setup

The API base URL is configured in `.env`:
```
VITE_API_BASE_URL=http://localhost:5000
```

## Available Services

### 1. Authentication Service (`authService`)
- `login(credentials)` - Login user
- `register(userData)` - Register new user
- `logout()` - Logout user
- `getCurrentUser()` - Get current user profile
- `refreshToken()` - Refresh auth token
- `changePassword(passwordData)` - Change password
- `forgotPassword(email)` - Request password reset
- `resetPassword(token, newPassword)` - Reset password

### 2. User Service (`userService`)
- `getAllUsers(params)` - Get all users (with optional filters)
- `getUserById(id)` - Get single user
- `createUser(userData)` - Create new user
- `updateUser(id, userData)` - Update user
- `deleteUser(id)` - Delete user
- `searchUsers(query)` - Search users

### 3. Category Service (`categoryService`)
- `getAllCategories()` - Get all categories
- `getCategoryById(id)` - Get single category
- `createCategory(categoryData)` - Create category
- `updateCategory(id, categoryData)` - Update category
- `deleteCategory(id)` - Delete category
- `addSubCategory(categoryId, subCategoryData)` - Add sub-category
- `updateSubCategory(categoryId, subCategoryId, data)` - Update sub-category
- `deleteSubCategory(categoryId, subCategoryId)` - Delete sub-category

### 4. Template Service (`templateService`)
- `getAllTemplates(params)` - Get all templates
- `getTemplateById(id)` - Get single template
- `uploadTemplate(formData)` - Upload new template
- `updateTemplate(id, templateData)` - Update template
- `deleteTemplate(id)` - Delete template
- `getTemplatesByCategory(categoryId, subCategoryId)` - Get templates by category
- `downloadTemplate(id)` - Download template file
- `searchTemplates(query)` - Search templates

## Usage Example

```javascript
import { userService, authService } from '@/services';

// Login
const handleLogin = async () => {
  try {
    const response = await authService.login({
      email: 'admin@example.com',
      password: 'password'
    });
    console.log('Logged in:', response);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Get users
const fetchUsers = async () => {
  try {
    const users = await userService.getAllUsers();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
```

## API Client Features

- **Auto Authorization**: Automatically adds Bearer token from localStorage
- **Error Handling**: Global error interceptor handles 401, 403, 404, 500 errors
- **Request Timeout**: 10 seconds default timeout
- **Content Type**: JSON by default, multipart/form-data for file uploads

## Next Steps

Once you provide the actual API endpoints from `http://localhost:5000/api-docs/`, we can:
1. Update the service methods to match your exact endpoints
2. Adjust request/response structures
3. Integrate the services into the UI components
4. Add proper error handling and loading states
