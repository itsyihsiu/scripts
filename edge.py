import cv2
cap = cv2.VideoCapture(0) #webcam
if not cap.isOpened():
    print("Cannot open camera")
    exit()
while True:
    ret, frame = cap.read()                       # 讀取一幀影像 ｏ
    if not ret:
        print("Cannot receive frame")
        break
    img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # 轉成灰階
    img = cv2.medianBlur(img, 7)                   # 模糊化，去除雜訊
    img = cv2.Canny(img, 36, 36)                   # 偵測邊緣
    cv2.imshow('edge detection', img)
    if cv2.waitKey(1) == ord('q'):
        break                                      # 按下 q 鍵停止
cap.release()
cv2.destroyAllWindows()
