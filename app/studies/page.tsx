import { redirect } from "next/navigation";
import { getFirstLesson } from "@/data/studies";

export default function StudiesIndexPage() {
  const { book, lesson } = getFirstLesson();
  redirect(`/studies/${book}/${lesson}`);
}
