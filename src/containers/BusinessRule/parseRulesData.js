import { avatarIcons } from '../../constants';

export const parseRulesData = rules => {
  let replyRules = [];
  let avatarRules = [];

  rules?.forEach(rule => {
    if (rule.ruleType === 'reply') {
      replyRules.push({
        id: rule.id,
        domain: rule?.ruleDomain,
        duration: rule?.rule?.map?.hours + ' hours',
        status: rule?.enable ? 'enabled' : 'disabled',
        rule: rule,
      });
    } else if (rule.ruleType === 'avatar') {
      avatarRules.push({
        id: rule.id,
        domain: rule?.ruleDomain,
        avatar: rule?.rule?.map?.avatar
          ? avatarIcons[rule?.rule?.map?.avatar]
          : undefined,
        color: rule?.rule?.map?.color,
        status: rule?.enable ? 'enabled' : 'disabled',
        rule: rule,
      });
    }
  });

  return [
    {
      title: 'REPLY RULE',
      headers: [
        { domain: 'Domain' },
        { duration: 'Duration' },
        { status: 'Status' },
        { operations: 'Operations' },
      ],
      data: replyRules,
    },
    {
      title: 'AVATAR RULE',
      headers: [
        { domain: 'Domain' },
        { avatar: 'Avatar' },
        { color: 'Color' },
        { status: 'Status' },
        { operations: 'Operations' },
      ],
      data: avatarRules,
    },
  ];
};
