import axios from "axios";

export const api = {
    getData(name, currentPage = 1, pageSize = 8) {
        return axios.get(`https://api.github.com/orgs/${name}/repos?per_page=${pageSize}&page=${currentPage}`)
    }
};
