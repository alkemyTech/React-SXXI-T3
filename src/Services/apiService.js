import { ApiCore } from "./apiCore";

export const apiNews = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    delete: true,
    url: 'news'
});

export const apiActivity = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    delete: true,
    url: 'activities'
});

export const apiUser = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    delete: true,
    url: 'users'
});

export const apiCategory = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    delete: true,
    url: 'categories'
});

export const apiContact = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    delete: true,
    url: 'contacts'
});

export const apiSlide = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    delete: true,
    url: 'slides'
});

export const apiMember = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    delete: true,
    url: 'members'
});

export const apiOrganization = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    delete: false,
    url: 'organization'
});

export const apiTestimonials = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    delete: true,
    url: 'testimonials'
});

export const apiProject = new ApiCore({
    getAll: true,
    getSingle: true,
    post: true,
    put: true,
    patch: false,
    delete: true,
    url: 'projects'
});
