# Solyn Advisory Admin Dashboard User Guide (English)

## Table of Contents
1. [Logging In](#logging-in)
2. [Article Management](#article-management)
3. [Case Study Management](#case-study-management)
4. [Client Logo Management](#client-logo-management)
5. [FAQ](#faq)

---

## Logging In

### Step 1: Access the Admin Dashboard
1. Open your browser and navigate to `https://solynadvisory.com/admin`
2. If you're not logged in, you'll be redirected to the login page

### Step 2: Authenticate with Manus OAuth
1. Click the "Login with Manus" button
2. Sign in with your Manus account credentials
3. Authorize the application to access your account information
4. You'll be redirected to the admin dashboard upon successful login

### Step 3: Verify Admin Permissions
- The system automatically checks if you have admin privileges
- If you don't have admin access, you'll be redirected to the homepage
- Contact the website owner to request admin permissions

---

## Article Management

### Creating a New Article

#### Step 1: Navigate to Article Management
1. Log in to the admin dashboard
2. Click the "Articles" tab at the top
3. Click the "New Article" button

#### Step 2: Fill in Article Details
1. **Language**: Select the article language (English/中文/日本語)
2. **Status**: Choose "Draft" or "Published"
   - Draft: Article won't be visible on the website
   - Published: Article will be displayed immediately
3. **Title**: Enter the article title (required)
4. **Slug**: Enter a URL-friendly identifier (required)
   - Example: `ma-service-benefits`
   - Use lowercase letters, numbers, and hyphens only
5. **Author**: Enter the author's name
6. **Category**: Enter the article category (optional)
   - Examples: M&A, Financial Advisory, IT Solutions
7. **Excerpt**: Enter a brief summary (optional)
   - Displayed in article lists
   - Recommended: 100-200 characters
8. **Content**: Enter the full article content (required)
   - Supports Markdown formatting
   - Can include headings, lists, code blocks, etc.

#### Step 3: Publish the Article
1. Review all information for accuracy
2. Click the "Create Article" button
3. Wait for the success notification
4. The article will be displayed on the website immediately (if Published)

### Editing an Article

#### Step 1: Find the Article
1. Go to the Articles tab
2. Locate the article in the list
3. Click the "Edit" button

#### Step 2: Update Information
1. Modify any fields as needed
2. You can update title, content, status, etc.

#### Step 3: Save Changes
1. Click the "Update Article" button
2. Wait for the success notification
3. Changes take effect immediately

### Deleting an Article

1. Go to the Articles tab
2. Find the article you want to delete
3. Click the "Delete" button
4. Confirm the deletion in the dialog box
5. The article will be permanently deleted

### Managing Multi-language Content

#### Creating Multiple Language Versions
1. Create separate articles for each language
2. Use the same slug for all versions
3. Select different languages
4. Enter content in the respective language
5. The system automatically recognizes and associates multi-language versions

#### Example
- English: slug = `ma-service-benefits`, language = English
- Chinese: slug = `ma-service-benefits`, language = 中文
- Japanese: slug = `ma-service-benefits`, language = 日本語

---

## Case Study Management

### Creating a New Case Study

#### Step 1: Navigate to Case Management
1. Log in to the admin dashboard
2. Click the "Cases" tab at the top
3. Click the "New Case" button

#### Step 2: Fill in Case Details
1. **Language**: Select the case language
2. **Status**: Choose "Draft" or "Published"
3. **Title**: Enter the case title (required)
4. **Slug**: Enter a URL-friendly identifier (required)
5. **Category**: Enter the case category (optional)
   - Examples: M&A, Financial Advisory, Overseas Expansion
6. **Case Image**: Upload a case image
   - Click the upload area or drag and drop an image
   - Supported formats: JPG, PNG, GIF, WebP
   - Maximum file size: 5MB
7. **Description**: Enter a brief case summary (optional)
8. **Content**: Enter detailed case content (required)

#### Step 3: Publish the Case
1. Verify all information is correct
2. Click the "Create Case" button
3. Wait for the success notification

### Editing a Case Study

1. Go to the Cases tab
2. Click the "Edit" button for the case you want to modify
3. Update the necessary information
4. Click the "Update Case" button

### Deleting a Case Study

1. Go to the Cases tab
2. Click the "Delete" button for the case
3. Confirm the deletion

### Uploading Case Images

#### Using Cloudinary Upload
1. In the case form, find the "Case Image" section
2. Click the upload area or drag an image file
3. The system automatically uploads to Cloudinary
4. Upon completion, the image URL is automatically populated
5. Click "Create Case" or "Update Case" to save

#### Supported Image Formats
- JPG/JPEG
- PNG
- GIF
- WebP

#### Image Optimization
- Cloudinary automatically optimizes image size and quality
- Images are automatically resized for web display
- No manual editing or compression needed

---

## Client Logo Management

### Adding a New Client Logo

#### Step 1: Navigate to Logo Management
1. Log in to the admin dashboard
2. Click the "Client Logos" tab at the top
3. Click the "New Logo" button

#### Step 2: Fill in Logo Details
1. **Company Name**: Enter the client company name (required)
2. **Logo Image**: Upload the logo image
   - Click the upload area or drag and drop an image
   - Supported formats: JPG, PNG, GIF, WebP
   - Maximum file size: 5MB
3. **Display Order**: Enter the display order number
   - Lower numbers appear first in the carousel
   - Example: 1, 2, 3, 4, 5, 6
4. **Status**: Choose "Active" (display) or "Inactive" (hide)

#### Step 3: Save the Logo
1. Verify the logo preview is correct
2. Click the "Add Logo" button
3. Wait for the success notification

### Editing a Client Logo

1. Go to the Client Logos tab
2. Click the "Edit" button for the logo
3. Modify the company name, display order, or status
4. Click the "Update Logo" button

### Deleting a Client Logo

1. Go to the Client Logos tab
2. Click the "Delete" button for the logo
3. Confirm the deletion

### Adjusting Logo Display Order

1. Go to the Client Logos tab
2. Edit the logo you want to reorder
3. Modify the "Display Order" field
4. Click the "Update Logo" button
5. The homepage logo carousel will automatically reflect the new order

### Hiding/Showing Logos

1. Go to the Client Logos tab
2. Edit the logo you want to adjust
3. In the "Status" dropdown, select "Active" or "Inactive"
4. Click the "Update Logo" button
5. Inactive logos won't be displayed on the website

---

## FAQ

### Q1: I forgot my admin password. What should I do?
**A:** The system uses Manus OAuth for authentication, so there's no password to forget. If you can't log in, ensure:
1. You have a registered Manus account
2. Your Manus account has been set as an admin
3. Your browser allows cookies (for session persistence)

### Q2: How do I create multi-language content?
**A:** Create a separate article or case for each language:
1. Use the same slug (URL identifier)
2. Select different languages
3. Enter content in the respective language
4. The system automatically recognizes and associates them

### Q3: My uploaded image isn't displaying. What should I do?
**A:** Check the following:
1. Is the image format supported? (JPG, PNG, GIF, WebP)
2. Is the file size under 5MB?
3. Is your internet connection stable?
4. Try refreshing the page or re-uploading

### Q4: How can I preview an article or case?
**A:**
1. When creating/editing, set the status to "Published"
2. Click save
3. Visit the website homepage or relevant list page
4. To hide it, change the status to "Draft"

### Q5: Can I delete multiple articles at once?
**A:** Currently, the system doesn't support bulk deletion. You need to delete articles individually.

### Q6: Can I adjust the logo carousel speed?
**A:** The logo carousel speed is fixed at 8 seconds. Contact the development team if you need to change it.

### Q7: What formatting does article content support?
**A:** Article content supports Markdown formatting, including:
- Headings (# ## ###)
- Lists (- or * or 1.)
- Bold (**text**)
- Italic (*text*)
- Code blocks (```)
- Links ([text](URL))
- Images (![alt](URL))

### Q8: How do I contact technical support?
**A:** If you encounter technical issues:
1. Check the browser console for error messages
2. Try clearing your browser cache and logging in again
3. Contact the website owner or development team

---

## Best Practices

### Article Management
- ✅ Use clear, concise titles
- ✅ Write an engaging summary for each article
- ✅ Check spelling and formatting before publishing
- ✅ Use the same slug for multi-language content
- ❌ Don't use special characters in titles
- ❌ Don't publish empty or incomplete articles

### Image Management
- ✅ Use high-quality images (at least 1200x800px)
- ✅ Compress images to reduce load time
- ✅ Use meaningful file names
- ✅ Ensure images are relevant to the content
- ❌ Don't upload files larger than 5MB
- ❌ Don't use blurry or low-quality images

### Logo Management
- ✅ Use transparent background PNG format logos
- ✅ Keep logo sizes consistent
- ✅ Regularly review logo display order
- ✅ Hide logos for inactive partners
- ❌ Don't use oversized logo files
- ❌ Don't mix different logo styles

---

## Quick Reference

| Feature | Path | Shortcut |
|---------|------|----------|
| Article Management | /admin → Articles | - |
| Case Management | /admin → Cases | - |
| Logo Management | /admin → Client Logos | - |
| Logout | Click Logout (top right) | - |

---

**Last Updated**: March 16, 2026
**Version**: 1.0
**Language**: English
