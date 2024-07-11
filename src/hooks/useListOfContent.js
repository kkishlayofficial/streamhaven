import { useSelector } from "react-redux";
import { mergeArraysFromObjects } from "../utils/helperFunctions";

const useListOfContent = () => {
  const movieList = useSelector((state) => state.movies);
  const tvList = useSelector((state) => state.tv);
  if (!movieList || !tvList) return;
  const contentList = mergeArraysFromObjects(movieList, tvList);
  return contentList;
}

export default useListOfContent;