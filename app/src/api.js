import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data })
  },
  stories: {
    fetchAll: () => axios.get("/api/stories").then(res => res.data.stories),
    create: story => axios.post("/api/stories", { story }).then(res => res.data.story),
    fetchStory: id => axios.post("/api/stories/story", { id }).then(res => res.data.story),
    comment: data => axios.post("/api/stories/comment", { data }).then(res => res.data.comment),
    analyze: data => axios.post("/api/stories/analyze", { data }).then(res => res.data.data)
  },
  utils: {
    fileUpload: (data,progress) =>
     axios.post('/api/utils/file-upload', data, progress).then(res => res.data.data)
  }
};
