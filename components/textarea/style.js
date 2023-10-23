export const styles = {
  width: "100%",
  marginBottom: "20px",
  padding: "10px",
  fontSize: "22px",
  border: "3px solid #7e797659",
  borderRadius: "5px",
  backgroundColor: "#ddd2cc59",
  color: "#6f6161",
  outline: "none",
  fontSize: "17px",
  lineHeight: "1.4",
  resize: "none",
  scrollbar: `
    textarea::-webkit-scrollbar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 6px;
      background-color: transparent;
    }

    textarea::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgb(128, 123, 123);
    }

    textarea::-webkit-scrollbar-track {
      box-shadow: none;
      border-radius: 10px;
      background-color: rgba(186, 163, 163, 0.34);
      color: rgba(186, 163, 163, 0.34);
    }
  `,
};
