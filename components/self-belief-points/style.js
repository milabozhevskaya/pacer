export const styles = {
  display: "flex",
  alignItems: "center",
  marginRight: "10px",
  points: {
    marginRight: "10px",
    width: "fit-content",
    boxShadow: `#f6c3411f 0px 2px 4px 0px, #eb8d3c52 0px 2px 16px 0px`,
    borderRadius: "5px",
    border: "1px solid #eb8d3c54",
    color: "#7c4747",
    transition: ".4s ease-in-out",
    display: "flex",
    onfocus: {
      color: "#b75621",
      border: "1px solid #f0ad73",
    },
    label: {
      display: "inline-flex",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
      position: "relative",
    },
    span: {
      minWidth: "40px",
      minHeight: "38px",
      textAlign: "center",
      padding: "0 15px",
      opacity: 0,
    },
    input: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      textAlign: "center",
      cursor: "pointer",
      padding: "0 15px",
      backgroundColor: "transparent",
      color: "currentColor",
      onfocus: {
        cursor: "auto",
        outline: "none",
      },
    },
  },
  pointsCalculate: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
    calculateWrapper: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #eb8d3c54",
      borderRadius: "5px",
      color: "#7c4747",
    },
    calculateInput: {
      outline: "none",
      border: "none",
      padding: "0px 5px 0px 14px",
      width: "190px",
      color: "currentColor",
    },
    calculateButton: {
      disabled: {
        cursor: "not-allowed",
        color: "#a17f7fc9",
        backgroundColor: "#65605b24",
      },
      waiting: {
        cursor: "wait",
        color: "#a17f7fc9",
        backgroundColor: "#65605b24",
      },
    },
    open: {
      display: "flex",
    },
    close: {
      display: "none",
    },
  },
  openButton: {
    minWidth: "30px",
    span: {
      padding: "0px 15px 0px 15px",
    },
  },
};
