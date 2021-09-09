import { ApiService } from "./index";

const VideoService = {
    getToken: (payload) => ApiService.get(`/video/token/${payload}`),
};

export default VideoService;
