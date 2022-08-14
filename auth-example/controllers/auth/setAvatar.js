const path = require("path");
const fs = require("fs/promises");

const { basedir } = global;
const { User } = require(`${basedir}/models/user`);

const avatarsDir = path.join(basedir, "public", "avatars"); // куда перемещать ("avatars")
// console.log("~ avatarsDir", avatarsDir); // D:\Education\nodejs\auth-example\public\avatars

const setAvatar = async (req, res) => {
  try {
    const { path: tempPath, originalname } = req.file; // путь к папке temp

    const { _id } = req.user;

    const [extension] = originalname.split(".").reverse(); // забирает расширение файла (.png)
    // console.log("~ extension", extension); // png

    const newName = `${_id}.${extension}`; // создание уникального имени файла
    // console.log("~ newName", newName); // 62f903bde3eaf7f6b83461a5.png
    
    const uploadPath = path.join(avatarsDir, newName); // полный путь к файлу в папке avatars
    // console.log("~ uploadPath", uploadPath); // D:\Education\nodejs\auth-example\public\avatars\62f903bde3eaf7f6b83461a5.png
    
    await fs.rename(tempPath, uploadPath); // перемещаем

    const avatarURL = path.join("avatars", newName); // новый путь к файлу
    // console.log("~ avatarURL", avatarURL); // avatars\62f903bde3eaf7f6b83461a5.png

    // перезаписывает путь рандомной авы на загруженную в папку "avatars" в БД
    await User.findByIdAndUpdate(_id, { avatarURL }); 

    res.json({
      avatarURL, 
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = setAvatar;
