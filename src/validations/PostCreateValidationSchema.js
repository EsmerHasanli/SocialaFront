import * as Yup from 'yup'

const PostCreateValidationSchema = Yup.object({
    description: Yup.string().max(500, "Description can not be more than 500 chars long"),
    files: Yup.mixed()
    .test('fileSize', 'File size must be less than 15MB', (value) => {
      if (!value) return true; 
      return value.size <= 15 * 1024 * 1024;
    })
    .test('fileType', 'Invalid file type. Only videos and images are allowed', (value) => {
      if (!value) return true; 
      return ['video/mp4', 'image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    })
    .nullable()
})

export default PostCreateValidationSchema