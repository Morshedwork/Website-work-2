"use client"

import { Label } from "@/components/ui/label"
import { Dialog } from "@/components/ui/dialog"
import { Table } from "@/components/ui/table"
import { Tabs } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function TestComponent() {
  return (
    <div>
      <h1>Test Component</h1>
      <Label>Test Label</Label>
      <Table>
        <tbody>
          <tr>
            <td>Test</td>
          </tr>
        </tbody>
      </Table>
      <Switch />
    </div>
  )
} 