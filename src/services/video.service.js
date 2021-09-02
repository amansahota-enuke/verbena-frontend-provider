import { ApiService } from "./index";

const VideoService = {
    createToken: (payload) => ApiService.post("/video/token", payload),
};

export default VideoService;
