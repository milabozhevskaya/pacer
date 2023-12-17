export const styles = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  columnGap: "10px",
  time: {
    userSelect: "none",
    color: "#999",
    zIndex: '20',
  },
  calendarButton: {
    zIndex: '20',
  },
  changeTimeButton: {
    zIndex: '20',
  },
  timeModeButton: {
    zIndex: '20',
    minWidth: "30px",
    span: {
      padding: "0px 15px 0px 15px",
    },
  },
  timeDisplay: {
    display: "flex",
    alignItems: "center",
  },
  timeInput: {
    display: "flex",
    alignItems: "center",
    input: `.date-widget__time-input::-webkit-datetime-edit { padding: 1em; }
    .date-widget__time-input::-webkit-datetime-edit-fields-wrapper { background: silver; }
    .date-widget__time-input::-webkit-datetime-edit-text { color: red; padding: 0 0.3em; }
    .date-widget__time-input::-webkit-datetime-edit-month-field { color: blue; }
    .date-widget__time-input::-webkit-datetime-edit-day-field { color: green; }
    .date-widget__time-input::-webkit-datetime-edit-year-field { color: purple; }
    .date-widget__time-input::-webkit-inner-spin-button { display: none; }
    .date-widget__time-input::-webkit-calendar-picker-indicator { background: orange; }`,
  },
  popup: {
    right: "0",
    top: "calc(100% + 10px)",
    zIndex: '10',
  },
};
