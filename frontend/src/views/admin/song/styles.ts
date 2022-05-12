import { Styles } from "../../../theme/types";

export const styles: Styles = {
  title: {
    fontWeight: "Bold",
    padding: "20px 0",
  },
  songContainer: {
    display: "flex",
    gap: "60px",
    padding: "40px 0",
    flexDirection: "column",
  },
  tableInfo:{
    width: "auto",
  },
  songId: {
    fontSize: "1.1rem",
  },
  songField: {
    fontSize: "1.1rem",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  songActions: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  formContainer: {
    // width: '100%',
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formInput: {
    margin: "20px 0",
  },
  formButton: {
    margin: "20px 0",
  },
};