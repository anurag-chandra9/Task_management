import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
  useTheme,
  alpha,
  Divider,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: GitHubIcon, url: 'https://github.com/anurag-chandra9', label: 'GitHub' },
    { icon: LinkedInIcon, url: 'https://www.linkedin.com/in/anurag-chandra9/', label: 'LinkedIn' },
    { icon: TwitterIcon, url: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backdropFilter: 'blur(20px)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.02)}, ${alpha(theme.palette.secondary.main, 0.02)})`,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Made with
            </Typography>
            <FavoriteIcon
              sx={{
                color: theme.palette.error.main,
                fontSize: 16,
                animation: 'pulse 1.5s ease infinite',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                  },
                  '50%': {
                    transform: 'scale(1.2)',
                  },
                  '100%': {
                    transform: 'scale(1)',
                  },
                },
              }}
            />
            <Typography variant="body2" color="text.secondary">
              by Anurag Chandra © {currentYear}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

          <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                component={Link}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
                aria-label={social.label}
              >
                <social.icon />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
