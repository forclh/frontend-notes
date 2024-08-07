import { createMovieTags } from './list/index';
import { createPagers } from './pager'
import { getMovies } from '../api/movie';



async function init() {
  const resp = await getMovies(1, 30);
  createMovieTags(resp.data.movieList);
  createPagers(1, 30, resp.data.movieTotal);  // 创建分页
}
init();