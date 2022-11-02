import { Role, Guild, GuildMember, Message, messageLink, SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";
import { createEmbeded } from "../utils/embeded";

export const refreshroles: Command = {
  data: new SlashCommandBuilder()
    .setName("refreshroles")
    .setDescription("Refresh member status for all members"),
  run: async (interaction, client) => {
    await interaction.deferReply({ ephemeral: false });

    const memberRole = await interaction?.guild?.roles.cache.find(r => r.name==="Member");
    const members = memberRole?.members;
    let usersRemoved: string[] = [];
    if (memberRole) {
      members?.forEach(member => {
        member.roles.remove(memberRole, "End of semester member expiry");
        usersRemoved.push(member.displayName);
      })
    }

    let messageDescription = usersRemoved.length > 0 ? "Removed member role from the following users: " : "No member roles removed"
    for (const name of usersRemoved) {
        messageDescription += "\n" + name
    }

    const { user } = interaction;
    const returnMessage = createEmbeded(
      "Member roles refreshed",
      messageDescription,
      user,
      client
    )
      .setColor("Red")
      .setFooter(null)
      .setTimestamp(null);
    await interaction.editReply({ embeds: [returnMessage] });
    return;
  },
};
