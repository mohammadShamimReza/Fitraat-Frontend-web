"use client";
import { Card, Collapse, Typography } from "antd";
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export default function BlockerInstructions() {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-4xl mx-auto">
        <Title level={2} className="text-center mb-8">
          Device Blocking Instructions
        </Title>

        <Card className="mb-6 shadow-lg">
          <Paragraph>
            Follow the instructions below to block access on all your devices
            and improve focus. This includes phones, PCs, routers, and operating
            systems like Windows, Mac, Linux, iOS, and Android.
          </Paragraph>
        </Card>

        <br /><br />

        <Collapse defaultActiveKey={["1"]} accordion>
          <Panel header="Windows PC" key="1">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Use hosts file to block sites:{" "}
                C:\Windows\System32\drivers\etc\hosts
              </li>
              <li>
                Install focus apps like Cold Turkey, Freedom, or LeechBlock (for
                browsers).
              </li>
              <li>
                Set parental controls in Windows Settings → Family & other
                users.
              </li>
            </ul>
          </Panel>

          <Panel header="Mac (macOS)" key="2">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Edit hosts file: /etc/hosts
              </li>
              <li>Use Focus apps: Freedom, Cold Turkey, or SelfControl.</li>
              <li>
                Set Screen Time restrictions in System Preferences → Screen
                Time.
              </li>
            </ul>
          </Panel>

          <Panel header="Linux PC" key="3">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Edit /etc/hosts to block sites.
              </li>
              <li>
                Install blockers like LeechBlock (browser) or self-made iptables
                rules.
              </li>
              <li>
                Use parental control apps like Gnome Nanny or Timekpr-nExT.
              </li>
            </ul>
          </Panel>

          <Panel header="iPhone (iOS)" key="4">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Use Screen Time → Content & Privacy Restrictions → Limit adult
                content.
              </li>
              <li>Install blocking apps like Freedom or BlockSite.</li>
              <li>Disable Safari or other browsers if needed.</li>
            </ul>
          </Panel>

          <Panel header="Android Phone" key="5">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Use Digital Wellbeing → Focus mode → Add websites or apps to
                block.
              </li>
              <li>Install blockers: BlockSite, Stay Focused, or AppBlock.</li>
              <li>Use Safe Mode / Guest profile for limited access.</li>
            </ul>
          </Panel>

          <Panel header="Router / Network" key="6">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Access your router admin panel (usually 192.168.1.1 or
                192.168.0.1).
              </li>
              <li>
                Add adult or distracting sites to blocklist / parental controls.
              </li>
              <li>
                Enable time-based restrictions for devices in your network.
              </li>
            </ul>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}
