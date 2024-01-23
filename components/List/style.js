export const styles = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "3px",
  position: "relative",
  rowGap: "2px",
  row: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "4px 5px 4px 9px",
    fontSize: "22px",
    border: "3px solid #7e797659",
    borderRadius: "3px",
    backgroundColor: "#ddd2cc59",
    color: "#6f6161",
    outline: "none",
    fontSize: "17px",
    lineHeight: "1.4",
    whiteSpace: "break-spaces",
    wordBreak: "break-all",
    position: "relative",
    columnGap: "5px",
    wrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      flexGrow: "1",
    },
    span: {
      width: "100%",
      opacity: "1",
      pointerEvents: "auto",
      paddingLeft: "2px",
      edit: {
        opacity: "0",
        pointerEvents: "none",
      },
    },
    input: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: "0px",
      outline: "none",
      backgroundColor: "transparent",
      width: "100%",
      opacity: "0",
      pointerEvents: "none",
      color: "#6f6161",
      edit: {
        opacity: "1",
        pointerEvents: "auto",
      },
    },
    buttons: {
      display: "flex",
      columnGap: "5px",
      flexShrink: "0",
      alignItems: "center",
      position: "relative",
      wrapper: {
        display: "flex",
        columnGap: "5px",
        alignItems: "center",
      },
      view: {
        opacity: "1",
        pointerEvents: "auto",
        zIndex: "100",
        edit: {
          opacity: "0",
          pointerEvents: "none",
          zIndex: "10",
        },
      },
      edit: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        opacity: "0",
        pointerEvents: "none",
        zIndex: "10",
        view: {
          opacity: "1",
          pointerEvents: "auto",
          zIndex: "100",
        },
      },
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "auto",
      height: "auto",
      padding: "4px 4px",
      span: {
        padding: "0 0px",
        width: "20px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    icon: {
      width: "20px",
      height: "20px",
    },
    editIcon: {
      fill: "#4b639a",
    },
    deleteIcon: {
      fill: "#f14d23",
    },
    saveIcon: {
      fill: "#3f6f3f",
    },
    cancelIcon: {
      fill: "#f7a40c",
    },
  },
};
