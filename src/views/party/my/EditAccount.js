import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BottomNavCloseAction } from "../../../reducers/container/bottomNav";

const EditAccount = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BottomNavCloseAction);

  },[]);

  return(
    <div className="page">
      hi

    </div>

  );
}

export default EditAccount;