export const styles = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  time: {
    userSelect: "none",
    marginRight: "10px",
    color: "#999",
    zIndex: '20',
  },
  button: {
    zIndex: '20',
  },
  popup: {
    width: "70vw",
    maxWidth: "380px",
    padding: "10px",
    borderRadius: "5px",
    position: "absolute",
    right: "0",
    top: "calc(100% + 10px)",
    border: '2px solid #e5a990',
    zIndex: '10',
    wrapper: {
      position: "relative",
      width: "100%",
      padding: "20px 26px",
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "0px 0px 5px #999",
      zIndex: '10',
    },
    ['.hover']: {
      backgroundColor: "red",
    }
  },
};
