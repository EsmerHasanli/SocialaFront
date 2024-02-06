import * as Yup from 'yup'

const CommentvalidationSchema = Yup.object({
    text: Yup.string().min(1, 'Commet can not be empty').max(100, 'Comment can not be more than 100 characters').required()
})

export default CommentvalidationSchema