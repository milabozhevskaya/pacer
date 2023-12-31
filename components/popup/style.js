export const styles = {
  width: "70vw",
  maxWidth: "380px",
  padding: "10px",
  borderRadius: "5px",
  position: "absolute",
  border: '2px solid #e5a990',
  wrapper: {
    position: "relative",
    width: "100%",
    padding: "20px 26px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px #999",
    zIndex: '10',
  },
  after: `.popup:after {
    content: '';
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: #bdb6b668;
    backdrop-filter: blur(4px);
    position: absolute;
    top: 0;
    left: 0;
  }`,
};
