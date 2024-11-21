import React, { createContext, useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

export const UserContext = createContext();

// Đường dẫn lưu tệp user.json trong bộ nhớ ứng dụng
const USERS_FILE_PATH = `${FileSystem.documentDirectory}user.json`;

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Đọc dữ liệu từ tệp JSON khi khởi tạo
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(USERS_FILE_PATH);
        console.log("Đường dẫn tệp user.json:", USERS_FILE_PATH);

        if (fileInfo.exists) {
          const fileContent = await FileSystem.readAsStringAsync(USERS_FILE_PATH);
          console.log("Dữ liệu đã đọc từ tệp:", fileContent);
          setUsers(JSON.parse(fileContent)); // Đọc và cập nhật trạng thái người dùng
        } else {
          console.log("Tệp user.json chưa tồn tại, tạo tệp mới.");
          await FileSystem.writeAsStringAsync(USERS_FILE_PATH, JSON.stringify([], null, 2));
        }
      } catch (error) {
        console.error("Lỗi khi đọc tệp JSON:", error);
      }
    };

    loadUsers();
  }, []);

  // Thêm người dùng mới vào danh sách và lưu vào tệp
  const addUser = async (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers); // Cập nhật danh sách người dùng

    try {
      await FileSystem.writeAsStringAsync(USERS_FILE_PATH, JSON.stringify(updatedUsers, null, 2));
      console.log("Dữ liệu đã được lưu vào tệp user.json.");
    } catch (error) {
      console.error("Lỗi khi ghi dữ liệu vào tệp JSON:", error);
    }
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};
