const RuGif = () => {
  const ruGif = [
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHM5MmYxa21vOXM0cWtsMGgzdXRyOW1kYjJzYTZpYjdkYXpwZzJhaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3alF8L3P2Ah3y/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3R6bjZmdmJidGlrM3gyd2V5aWcwMG1vYXhyZnZtbzlvZmJyYWI3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uvsSwRBAoisqk/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzg1d2xnYXk3enh6anQxbnhhMTl6czIxYnVqaTZlbGxnc29pY2x1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ux8Sqc2Vm2MaA/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDFhMmJleWJ0OTdpOHZ2c25rd2M3YXc1YWhnMXBtNDNnaWo4OHpvMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vEvpE36f819lK/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXhmMG91M2RlcjEyOTI3ZTN3MThyc3o0MnR6bzV4djZ2a24wYmxodyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DPihSlyhzkA8g/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDhhOGV3dGkzNXJ5YXE4dzdzNGJ4dmxzYnhjZmF3anplZm5qNTNjbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MdduUVUwyTCeVXnI8F/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2NucnRvcGkxZHYxNDIybnJnYTJ6cWdlaW13aDJhdGRodnI4NWw5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FWCd1tPXrx07k3CG8H/giphy.gif",
  ];
  return (
    <img src={ruGif[Math.floor(Math.random() * ruGif.length)]} alt="RuPaul gif" />
  );
}

export default RuGif