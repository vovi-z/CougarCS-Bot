import { Role, Guild, GuildMember, Message, messageLink, SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";
import { createEmbeded } from "../utils/embeded";

export const purgeMemberRoles: Command = {
  data: new SlashCommandBuilder()
    .setName("purgememberroles")
    .setDescription("Purge member role for all members"),
  run: async (interaction, client) => {
    await interaction.deferReply({ ephemeral: false });

    const memberRole = await interaction?.guild?.roles.cache.find(r => r.name==="Member");
    const members = memberRole?.members;
    let usersRemoved: string[] = [];
    if (memberRole) {
      members?.forEach(member => {
        // TODO: log persons removed
        member.roles.remove(memberRole, "End of semester member expiry");
        usersRemoved.push(member.displayName);
      })
    }

    let messageDescription = usersRemoved.length + " member roles purged."

    const { user } = interaction;
    const returnMessage = createEmbeded(
      "Member Roles Purged",
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
