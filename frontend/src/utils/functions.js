import * as imageConversion from "image-conversion";

function compressImage(file) {
  return new Promise((resolve, reject) => {
    let compressedImage;

    const compressWithQuality = async () => {
      try {
        compressedImage = await imageConversion.compressAccurately(file, 25);
        resolve(compressedImage);
      } catch (error) {
        reject(error);
      }
    };

    compressWithQuality();
  });
}

const filterDate = (date) => {
  const newDate = new Date(date).getTime();
  const currentTime = new Date().getTime();
  const hoursAgo = ((currentTime - newDate) / 3600000).toFixed();
  let filteredDate;

  if (hoursAgo < 1) {
    filteredDate = "Just Now";
  } else if (10 < hoursAgo && hoursAgo < 24) {
    filteredDate = `yesterday`;
  } else if (hoursAgo > 24 && hoursAgo < 720) {
    const daysAgo = (hoursAgo / 24).toFixed();
    filteredDate = `${daysAgo}d ago`;
  } else if (hoursAgo > 720 && hoursAgo < 8640) {
    const monthsAgo = (hoursAgo / 24 / 30).toFixed();
    filteredDate = `${monthsAgo}months ago`;
  } else if (hoursAgo > 8640) {
    const yearsAgo = (hoursAgo / 24 / 30 / 12).toFixed();
    filteredDate = `${yearsAgo}years ago`;
  } else {
    filteredDate = `${hoursAgo}h ago`;
  }
  return filteredDate;
};

export { filterDate, compressImage };
