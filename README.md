# Vue Apollo GraphQL User List - Live Coding Challenge

**Duration:** 45-60 minutes  
**Stack:** Vue 3, @vue/apollo-composable, GraphQL  
**Difficulty:** Intermediate

[vue apollo composable link](https://v4.apollo.vuejs.org/guide-composable/query.html#executing-a-query)

## Objective

Implement a user management interface that displays users in a table format with pagination capabilities using GraphQL with Apollo Client.

## Requirements

### 1. GraphQL Query Implementation (15 minutes)

Use the provided GraphQL query to fetch users:

```graphql
query usersList(
  $per_page: Int
  $page: Int
  $filter: UserQueryObjectFilter!
  $sorting: [UserQueryObjectSort!]!
) {
  users(per_page: $per_page, page: $page, filter: $filter, sorting: $sorting) {
    items {
      id
      name
      username
      mfa_active
      created
    }
    meta {
      count
      per_page
      pages
    }
  }
}
```

**Query Variables:**
```javascript
{
  filter: { and: [], or: [] },
  sorting: [],
  page: 1,
  per_page: 5
}
```

**Apollo Settings:**
```javascript
{
  fetchPolicy: 'no-cache'
}
```

### 2. Vue Component Structure (20 minutes)

Create a `UserListView.vue` component with:

- **Table Layout:** Use CSS Grid or Flexbox (your choice)
- **Columns:** ID, Name, Username, MFA Status, Created Date
- **Loading State:** Show loading indicator during fetch
- **Error Handling:** Display error messages appropriately
- **Empty State:** Handle when no users are found

### 3. Pagination Implementation (10 minutes)

Implement pagination functionality:

- Show current page and total pages
- Previous/Next buttons
- Page number display
- Disable buttons when appropriate (first/last page)
- Update query variables when page changes

### 4. User invite form (15 minutes)
- Create UserInviteView.vue 
- 2 required fields with input email and role selection (with radio button list: Admin with id 1 , Observer with id 3, User with id 2)
- one button to submit form 
- on submit validate required fields and send inviteUser mutations(see /apollo/mutations/invite-user.gql)
- get organisation id for requrest from pinia authStore
- mutation 

```graphql
useMutation(inviteUserQuery, () => ({
  variables: {
    name,
    username,
    organisation: { id } , // get organisation id from user store  
    roles: { id },
  },
  refetchQueries: ['USER_LIST'],
}))

```

## Technical Requirements

### Apollo Composable Usage
```javascript
import { useQuery } from '@vue/apollo-composable'
```

### Expected Component Structure
```vue
<script setup>
// Apollo query implementation
// Reactive variables for pagination
// Computed properties for data transformation
</script>

<template>
  <!-- Table with users -->
  <!-- Pagination controls -->
</template>

<style scoped>
/* Table styling with Grid/Flex layout */
</style>
```

### Mock Data Structure
Since you won't have a real GraphQL endpoint, create a mock response:

```javascript
// Expected response format
{
  data: {
    users: {
      items: [
        {
          id: "1",
          name: "John Doe",
          username: "john.doe",
          mfa_active: true,
          created: "2024-01-15T10:30:00Z"
        },
        {
          id: "2",
          name: "Jane Smith",
          username: "jane.smith",
          mfa_active: false,
          created: "2024-01-10T14:22:00Z"
        },
        {
          id: "3",
          name: "Bob Wilson",
          username: "bob.wilson",
          mfa_active: true,
          created: "2024-01-08T09:15:00Z"
        },
        // ... more users
      ],
      meta: {
        count: 50,
        per_page: 5,
        pages: 10
      }
    }
  }
}
```

## Time Management Guide

- **0-15 min:** Set up GraphQL query and Apollo integration
- **15-35 min:** Build table component with data display
- **35-45 min:** Implement pagination functionality
- **45-55 min:** Add styling and UX improvements
- **55-60 min:** Final testing and refinements

## Success Indicators

By the end of the session, the candidate should have:

1. ✅ Working GraphQL query using the provided schema
2. ✅ Table displaying user data (ID, Name, Username, MFA Status, Created)
3. ✅ Functional pagination controls
4. ✅ Proper loading and error state handling
5. ✅ Clean, professional appearance
6. ✅ Responsive design considerations

## Bonus Points

- Advanced responsive design (mobile-friendly table)
- Custom loading spinner
- Smooth transitions and animations
- Accessibility features (ARIA labels, keyboard navigation)
- Error retry functionality
- Per-page selection dropdown
- Table row click handlers

## Common Pitfalls to Avoid

- Not handling loading/error states properly
- Incorrect query variable structure for the new schema
- Missing fetchPolicy configuration
- Poor responsive table implementation
- Not implementing proper pagination state management
- Forgetting to handle empty states
- Hardcoding values instead of using reactive data

## Key Differences from Standard Schema

This challenge uses a specific GraphQL schema where:
- Response data is in `users.items` (not `users.data`)
- Meta information uses `count` instead of `total`
- Meta uses `pages` instead of `last_page`
- User fields include `username` instead of `email`

The candidate should demonstrate adaptability to different API schemas and data structures.
