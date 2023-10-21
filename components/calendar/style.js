export const styles = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  useSelect: "none",
  top: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "13px",
    color: "#ff4600",
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "1.6px",
    year: {
      fontSize: "14px",
    },
  },
  days: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#ff4600ad",
    fontWeight: "bold",
    day: {
      width: `calc(100% / 7)`,
      textAlign: "center",
    },
  },
  weeks: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    rowGap: "8px",
    day: {
      color: "#492e2e63",
      width: `calc(100% / 7)`,
      textAlign: "center",
      padding: "2px",
      currentMonth: {
        color: "#492e2e",
      },
      currentDay: {
        color: "#e10a0a",
        // textShadow: '0 0 5px #e87a2d',
        border: "1px solid #e8862d",
        borderRadius: "50%",
      },
      weekend: {
        color: "#b07151",
      },
    },
  },
};
