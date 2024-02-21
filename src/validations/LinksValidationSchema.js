import * as Yup from "yup";

const LinksValidationSchema = Yup.object({
    facebookLink: Yup.string().url().matches(/^(https?:\/\/)?(www\.)?facebook.com\/.*/i, 'Invalid Facebook URL'),
    instagramLink: Yup.string().url().matches(/^(https?:\/\/)?(www\.)?instagram.com\/.*/i, 'Invalid Instagram URL'),
    githubLink: Yup.string().url().matches(/^(https?:\/\/)?(www\.)?github.com\/.*/i, 'Invalid Github URL'),
});

export default LinksValidationSchema;