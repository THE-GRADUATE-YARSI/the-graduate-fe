export const parseDate = (dateString) => {
  const months = {
    Januari: 0,
    Februari: 1,
    Maret: 2,
    April: 3,
    Mei: 4,
    Juni: 5,
    Juli: 6,
    Agustus: 7,
    September: 8,
    Oktober: 9,
    November: 10,
    Desember: 11,
  };

  const [day, month, year] = dateString.split(" ");
  return new Date(year, months[month], day);
};

export const openLink = (link) => {
  if (link) {
    const newWindow = window.open(link, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }
};
