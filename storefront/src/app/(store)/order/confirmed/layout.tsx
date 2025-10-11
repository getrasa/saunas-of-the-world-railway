import { NavigationBar } from "~/components/ui/navigation"

export default function ConfirmedLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar isStore={true} />
      {props.children}
    </>
  )
}

