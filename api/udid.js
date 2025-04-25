export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ msg: "小狐狸Server已啟動！" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
