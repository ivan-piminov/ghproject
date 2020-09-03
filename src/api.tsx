import axios from "axios";
import {ItemRep} from "./Types/type";

type LoadDataType = {
    items: Array<ItemRep>

}

export const api = {
    getData(name:string, currentPage = 1, pageSize = 8) {
        return axios.get<LoadDataType>(`https://api.github.com/orgs/${name}/repos?per_page=${pageSize}&page=${currentPage}`)
    }
};
