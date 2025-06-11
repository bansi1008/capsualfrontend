import "./globals.css";

export const metadata = {
  title: "Capsual - AI-Powered Email Scheduling for Special Occasions",
  description:
    "Never miss another birthday, anniversary, or special occasion. Let AI help you craft the perfect message and deliver it at just the right time.",
  keywords:
    "email scheduling, AI messages, birthday reminders, anniversary alerts, special occasions",
  authors: [{ name: "Capsual Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
