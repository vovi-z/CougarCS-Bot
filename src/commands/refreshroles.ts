import { Role, Guild, GuildMember, Message, messageLink, SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";
import { createEmbeded } from "../utils/embeded";

const userIdList: string[] = [
    "173981751427858433",
    "1031690627286581309",
]

const roleId = "1037378688293027881"

export const refreshroles: Command = {
  data: new SlashCommandBuilder()
    .setName("refreshroles")
    .setDescription("Refresh member status for all members"),
  run: async (interaction, client) => {
    await interaction.deferReply({ ephemeral: false });

    const thisGuild: Guild = await client.guilds.cache.get(interaction.guildId)
    const memberRole: Role = await thisGuild.roles.cache.get(roleId)
    let usersRemoved: string[] = []
    for (const userId of userIdList) {
        const member: GuildMember = await thisGuild.members.cache.get(userId)
        if (member && member.roles.cache.get(roleId)) {
            member.roles.remove(memberRole, "Expired membership")
            usersRemoved.push(member.displayName)
        }
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
